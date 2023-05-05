// import {useEffect} from 'react';
// import {openDatabase} from 'react-native-sqlite-storage';
// // const db = openDatabase({
// //   name: 'zipy',
// // });
// export const setData = async (time, message, jsonContent) => {
//   const db = openDatabase({
//     name: 'zipy',
//   });
//   await db.transaction(async tx => {
//     await tx.executeSql(
//       'INSERT INTO USERS (DateTime, Message,JsonContent) VALUES (?,?,?)',
//       [time, message, jsonContent],
//       (sqlTxn, res) => {
//         console.log('data added successfully', res);
//       },
//       error => {
//         console.log(error, 'this is the error');
//       },
//     );
//   });
// };

// export const createTable = () => {
//   const db = openDatabase({
//     name: 'zipy',
//   });
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS' +
//         ' USERS' +
//         '(ID INTEGER PRIMARY KEY AUTOINCREMENT, DateTime TEXT, Message TEXT, JsonContent TEXT);',
//       [],
//       (sqlTxn, res) => {
//         console.log('table created ');
//       },
//       error => {
//         console.log(error);
//       },
//     );
//   });
// };

// export const getData = async () => {
//   const db = openDatabase({
//     name: 'zipy',
//   });
//   await db.transaction(async tx => {
//     await tx.executeSql(
//       'SELECT * from USERS',
//       [],
//       (sqlTxn, res) => {
//         console.log(res, res.rows.length);
//         let len = res.rows.length;
//         if (len > 0) {
//           let result = [];
//           for (let i = 0; i < len; i++) {
//             console.log(i, '5050');
//             let item = res.rows.item(i);
//             console.log(item, 'this is item');
//             result.push({
//               id: item.ID,
//               Date: item.DateTime,
//               Message: item.Message,
//               JsonContent: item.JsonContent,
//             });
//           }
//           console.log(result, 'this is result');
//         }
//       },
//       error => {
//         console.log(error, 'this is the error');
//       },
//     );
//   });
// };

// export const deleteData = async () => {
//   const db = openDatabase({
//     name: 'zipy',
//   });
//   await db.transaction(async tx => {
//     await tx.executeSql(
//       'DROP TABLE USERS',
//       [],
//       (sqlTxn, res) => {
//         console.log('data deleted successfully');
//       },
//       error => {
//         console.log(error, 'this is the error');
//       },
//     );
//   });
// };
