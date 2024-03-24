import moment from 'moment';

export const API_URL = 'http://127.0.0.1:8000';

interface TableCellDateTimeProps {
  datetime: Date | undefined;
}
export const TableCellDateTime = (prop: TableCellDateTimeProps) => {
  const datetime = moment(prop.datetime);
  // Format the datetime as desired
  const formattedDatetime = datetime.format('YYYY-MM-DD HH:mm:ss');
  if (!prop.datetime) return (<td></td>)
  return (<td>{formattedDatetime}</td>
  );
}
// const convertPropertyNamesToLowerCase = (list: any[]): any[] => {
//   return list.map(item => {
//     const newItem: any = {};
//     for (const key in item) {
//       if (Object.prototype.hasOwnProperty.call(item, key)) {
//         const newKey = key.charAt(0).toLowerCase() + key.slice(1);
//         newItem[newKey] = item[key];
//       }
//     }
//     return newItem;
//   });
// };