import React, { useEffect, useState } from 'react';
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';

export default function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = 'http://localhost:3500/items';

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not receive expected data.');
                const listItems = await response.json();
                setItems(listItems);
            } catch (error) {
                setFetchError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        setTimeout(() => {
            fetchItems();
        }, 2000);
    }, []);

    const addItem = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const addNewItem = { id, checked: false, item };
        const listItems = [...items, addNewItem];
        setItems(listItems);

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addNewItem),
        };
        const result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result);
    };

    const handleCheck = async (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);

        const reqUrl = `${API_URL}/${id}`;
        const updateItem = listItems.filter((item) => item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checked: updateItem[0].checked }),
        };
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) setFetchError(result);
    };

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);

        const reqUrl = `${API_URL}/${id}`;
        const deleteOptions = {
            method: 'DELETE',
        };
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem.trim()) {
            setNewItem('');
            return;
        }
        addItem(newItem);
        setNewItem('');
    };

    return (
        <div className="App">
            <Header title="Grocery List" />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem search={search} setSearch={setSearch} />
            <main>
                {fetchError && (
                    <p
                        style={{ color: 'red', marginTop: '2rem' }}
                    >{`Sorry, ${fetchError}`}</p>
                )}
                {isLoading && (
                    <p style={{ marginTop: '2rem' }}>Loading Items...</p>
                )}
                {!fetchError && !isLoading && (
                    <Content
                        items={items.filter((item) =>
                            item.item
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                    />
                )}
            </main>
            <Footer length={items.length} />
        </div>
    );
}
