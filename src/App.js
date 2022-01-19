import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';

import { useState, useEffect } from 'react';
import AddItem from './AddItem';

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
        console.log(listItems);
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

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const addItem = (thisItem) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const theNewItem = {id: id, checked: false, item: thisItem}
    const listItems = [...items, theNewItem]
    setItems(listItems)
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
