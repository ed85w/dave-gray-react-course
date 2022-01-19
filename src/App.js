import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';
import AddItem from './AddItem';

import apiRequest from './apiRequest';

import { useState, useEffect } from 'react';

function App() {

  const API_URL = "http://localhost:3500/items"  //npx json-server -p 3500 -w data/db.json

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok){
          throw Error("did not receive data");
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch(err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems()

  }, [])

  const addItem = async (thisItem) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const theNewItem = {id: id, checked: false, item: thisItem}
    const listItems = [...items, theNewItem]
    setItems(listItems);

    // post new item to api 
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    // update state 
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    // update api 
    const theItem = listItems.find(e => e.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: theItem.checked})
    }

    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, updateOptions);
    if(result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    // update state 
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // update api 
    const deleteOptions = {
      method: 'DELETE'
    }

    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, deleteOptions);
    if(result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    if(!newItem) return;
    e.preventDefault();
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="this is the title"/>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && 
          <p>LOADING</p>
        }
        {fetchError && 
          <p style={{
            color:"red",
            paddingBottom: 30
          }}>Error!: {fetchError}</p>
        }
        {!fetchError && !isLoading &&
        <Content 
          items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        }
      </main>
      <Footer items={items}/>
    </div>
  );
}

export default App;
