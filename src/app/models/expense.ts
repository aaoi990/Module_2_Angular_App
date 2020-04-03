export interface Expense {
    id: number;
    type: string;
    description: string;
    cost: number;
    receipt_filepath: string;
}