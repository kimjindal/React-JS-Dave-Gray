import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();

    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItem">Add Item</label>
            <input
                type="text"
                ref={inputRef}
                autoFocus
                required
                id="addItem"
                placeholder="Add Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                onClick={(e) => inputRef.current.focus()}
                type="submit"
                aria-label="Add Item"
            >
                <FaPlus />
            </button>
        </form>
    );
};

export default AddItem;
