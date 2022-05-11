import { UndoObj } from "../components/Undo";
import { Data, SetData } from "../context/Data/DataProvider";
import { delay, hasError } from "../General";

//*** Replace with database functions ***//

//* Add
export async function add(
  id: string,
  data: Data,
  setData: SetData
): Promise<UndoObj> {
  //Delete
  await delay();
  if (hasError()) throw new Error("Error adding " + id);
  //Delete

  //error checking
  if (data.some((item) => item.name === id))
    throw new Error(id + " already exists");

  //saving
  setData?.((state) => {
    return [...state, { name: id, dateModified: new Date() }];
  });

  //return undo functions and message
  return {
    message: "Added " + id,
    undo: () => del(id, setData),
    undoDescription: "Delete " + id,
    redo: () => restore(id, setData),
    redoDescription: "Restore " + id,
  };
}

//* Delete
export async function del(id: string, setData: SetData): Promise<UndoObj> {
  //Delete
  await delay();
  if (hasError()) throw new Error("Error deleting " + id);
  //Delete

  //saving
  setData?.((state) =>
    state.map((item) =>
      item.name === id
        ? { ...item, deleted: new Date(), dateModified: new Date() }
        : item
    )
  );

  return {
    message: "Deleted " + id,
    undo: () => restore(id, setData),
    undoDescription: "Restore " + id,
    redo: () => del(id, setData),
    redoDescription: "Delete " + id,
  };
}

//* Restore
export async function restore(id: string, setData: SetData): Promise<UndoObj> {
  //Delete
  await delay();
  if (hasError()) throw new Error("Error restoring " + id);
  //Delete

  //saving
  setData?.((state) =>
    state.map((item) => {
      if (item.name === id) delete item.deleted;
      return { ...item, dateModified: new Date() };
    })
  );

  return {
    message: "Restored " + id,
    undo: () => del(id, setData),
    undoDescription: "Delete " + id,
    redo: () => restore(id, setData),
    redoDescription: "Restore " + id,
  };
}

//* Rename
export async function rename(
  id: string,
  //oldName: string, //same as id
  newName: string,
  setData: SetData
): Promise<UndoObj> {
  //Delete
  await delay();
  if (hasError()) throw new Error("Error renaming " + id);
  //Delete

  //saving
  setData?.((state) =>
    state.map((item) => {
      return item.name === id
        ? { ...item, name: newName, dateModified: new Date() }
        : item;
    })
  );

  return {
    message: id + " renamed to " + newName,
    undo: () => rename(newName, id, setData),
    undoDescription: "Restore " + newName + " to " + id,
    redo: () => rename(id, newName, setData),
    redoDescription: "Rename " + id + " to " + newName,
  };
}

//*** Multiple ***//
/*
When dealing with one promise, 
if the promise is rejected, 
the undoObj will not be pushed onto the undoList

When dealing with multiple promises,
If all the promises are rejected,
nothing will be pushed onto the undoList.
But if not all the promises are rejected:

option one and currently implemented:
All the undoObjs will be pushed onto the undoList,
the undoList doesn't care if some of the undoObjs are rejected.

option two:
The only the resolved undoObjs will be pushed onto the undoList,
The problem with this is what happens when the invoked undo fails some promises.
This will drastically more difficulty.



*/

//*Delete Some
export async function delSome(
  ids: string[],
  data: Data,
  setData: SetData
): Promise<UndoObj> {
  let allFailed = true;
  const messages: string[] = [];
  const promesses = ids.map((id) => del(id, setData));
  const results = await Promise.allSettled(promesses);

  results.forEach((result) => {
    if (result.status === "rejected") messages.push(result.reason.message);
    else {
      messages.push(result.value.message);
      allFailed = false;
    }
  });

  if (allFailed) throw new Error("Failed to delete all selected");

  return {
    message: messages.join(", "),
    undo: () => restoreSome(ids, data, setData),
    undoDescription: "Restore " + ids.join(", "),
    redo: () => delSome(ids, data, setData),
    redoDescription: "Delete " + ids.join(", "),
  };
}

//* Restore Some
export async function restoreSome(
  ids: string[],
  data: Data,
  setData: SetData
): Promise<UndoObj> {
  let allFailed = true;
  const messages: string[] = [];
  const promises = ids.map((id) => restore(id, setData));
  const results = await Promise.allSettled(promises);

  results.forEach((result) => {
    if (result.status === "rejected") messages.push(result.reason.message);
    else {
      messages.push(result.value.message);
      allFailed = false;
    }
  });

  if (allFailed) throw new Error("Failed to restore all selected");

  return {
    message: messages.join(", "),
    undo: () => delSome(ids, data, setData),
    undoDescription: "Delete " + ids.join(", "),
    redo: () => restoreSome(ids, data, setData),
    redoDescription: "Restore " + ids.join(", "),
  };
}
