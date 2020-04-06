import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { 
  Plugins, 
  CameraResultType, 
  Capacitor, 
  FilesystemDirectory, 
  CameraPhoto, 
  CameraSource } from '@capacitor/core';
import * as moment from 'moment';

const { 
  Camera, 
  Filesystem, 
  Storage } = Plugins;

import { Photo } from '../models/photo';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;

  constructor(platform: Platform) { 
    this.platform = platform;
  }

  public async addNewToGallery(expenseId: number)  {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
  
    const savedImageFile = await this.savePicture(capturedPhoto, expenseId);
    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos.map(p => {
              const photoCopy = { ...p };
              delete photoCopy.base64;
    
              return photoCopy;
              }))
    });
    return savedImageFile
  }

  public async loadSaved() {
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || [];
  
    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data
      });    
      photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  public async delete(id) {
    this.loadSaved().then(() => { 
      let index = this.photos.findIndex(p => p.filepath === id);    
      if (index !== -1) this.photos.splice(index, 1)
    }).then(() => {
      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos.map(p => {
                const photoCopy = { ...p };
                delete photoCopy.base64;     
                return photoCopy;
                }))
      });
    })    
  }

  private async savePicture(cameraPhoto: CameraPhoto, expenseId: number) {
    const base64Data = await this.readAsBase64(cameraPhoto);  
    const fileName = moment().unix()
      + '_expense_id_' + expenseId + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    return await this.getPhotoFile(cameraPhoto, fileName);
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format      
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;  
    }
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async getPhotoFile(cameraPhoto, fileName) {
    if (this.platform.is('hybrid')) {
      const fileUri = await Filesystem.getUri({
        directory: FilesystemDirectory.Data,
        path: fileName
      });
  
      return {
        filepath: fileUri.uri,
        webviewPath: Capacitor.convertFileSrc(fileUri.uri),
      };
    }
    else {
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }
}
