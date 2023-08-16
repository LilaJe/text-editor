import { openDB } from "idb";

// create database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDatabase = await openDB("jate", 1);
  const transaction = jateDatabase.transaction("jate", "readwrite"); // readwrite means editing the file
  const store = transaction.objectStore("jate"); // access the object store
  const request = store.put({ id: 1, value: content });
  const result = await request; // run the request
  console.log("result", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDatabase = await openDB("jate", 1);
  const transaction = jateDatabase.transaction("jate", "readonly"); // readonly means read only
  const store = transaction.objectStore("jate"); // access the object store
  const request = store.get(1);
  const result = await request; // run the request
  if (result) {
    console.log("result", result);
  } else {
    console.log("data not found");
  }
  return result?.value; // if results exist i want the value property.
};

initdb();
