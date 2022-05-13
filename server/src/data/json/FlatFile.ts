import { readFile, writeFile } from "fs";

export type FileObject<T> = { [x: string]: T };

export const saveToFile = <T>(path: string, items: FileObject<T>) =>
  new Promise<void>((resolve, reject) => {
    writeFile(path, JSON.stringify(items, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

export const loadFromFile = <T>(path: string) =>
  new Promise<FileObject<T>>((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) return reject(err);
      const readData = JSON.parse(data.toString());
      resolve(readData as FileObject<T>);
    });
  });

export default interface FlatFile {
  load(): Promise<void>;
  save(): Promise<void>;
}
