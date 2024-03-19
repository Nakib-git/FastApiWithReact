import moment from 'moment';

interface TableCellDateTimeProps {
    datetime: Date|undefined;
}
export const TableCellDateTime = (prop: TableCellDateTimeProps) => {
    const datetime = moment(prop.datetime);
    // Format the datetime as desired
    const formattedDatetime = datetime.format('YYYY-MM-DD HH:mm:ss');
    if (!prop.datetime) return (<td></td>)
    return (<td>{formattedDatetime}</td>
    );
}