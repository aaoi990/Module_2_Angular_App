import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { 
  Plugins, 
  CameraResultType, 
  Capacitor, 
  FilesystemDirectory, 
  CameraPhoto, 
  CameraSource } from '@capacitor/core';
/**
* <3 moment
*/
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

  /**
   * Creates an instance of photo service.
   * Sets the platform the app is running on web / app
   * @param platform 
   */
  constructor(platform: Platform) { 
    this.platform = platform;
    this.loadSaved();
  }

  /**
   * Adds a new photo to the gallery
   * @returns  
   */
  public async addNewToGallery()  {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
  
    const savedImageFile = await this.savePicture(capturedPhoto);
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

  /**
   * Loads saved photo's. Storage api only stores strings
   */
  public async loadSaved() {
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || []
    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
          path: photo.filepath,
      });   
      photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
    }
  }


  /**
   * Deletes photo from the gallery if it exists
   * and sets the storage. 
   * @param filepath of the photo to be deleted.
   */
  public async delete(filepath) {
      let index = this.photos.findIndex(p => p.filepath === filepath);    
      if (index !== -1) { 
        this.photos.splice(index, 1) 
        Storage.set({
          key: this.PHOTO_STORAGE,
          value: JSON.stringify(this.photos.map(p => {
                const photoCopy = { ...p };
                delete photoCopy.base64;     
                return photoCopy;
          }))
      });
    }     
  }

  /**
   * Saves picture. Has to be in base 64 format for the filesystem api
   * to save.
   * @param cameraPhoto 
   * @returns Promise<Photo> 
   */
  private async savePicture(cameraPhoto: CameraPhoto): Promise<Photo> {
    const base64Data = await this.readAsBase64(cameraPhoto);  
    const fileName = moment().unix()
      + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    return await this.getPhotoFile(cameraPhoto, fileName);
  }

  /**
   * Reads as base64 for filesystem api
   * @param cameraPhoto 
   * @returns Promise<string> 
   */
  private async readAsBase64(cameraPhoto: CameraPhoto): Promise<string> {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });  
      return file.data;
    }  else {     
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

  /**
   * Gets photo file in the correct format for the platform.
   * Use 'hybrid' to check for the native capacitor / cordova
   * runtimes.
   * @param cameraPhoto 
   * @param fileName 
   * @returns  
   */
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
