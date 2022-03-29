import Cell from './Cell';

const Row = ({ item }) => {
    return (
        <tr>
            {Object.entries(item).map(([key, value]) => (
                <Cell key={key} cellData={value} />
            ))}
        </tr>
    );
};

export default Row;
