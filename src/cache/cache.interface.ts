export default interface Cache {
  getValues(key: string): Promise<any | undefined>;
  setValues(key: string, value: any): Promise<void>;
  deleteValues(key: string): Promise<void>;
}
