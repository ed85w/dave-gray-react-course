import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';

import { useState, useEffect } from 'react';
import AddItem from './AddItem';

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

  const[newItem, setNewItem] = useState('')

  const[search, setSearch] = useState('')

  // when 'items' changes update localstorage (useEffect also runs on initial render)
  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  },[items])

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
      <Content 
        items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer items={items}/>
    </div>
  );
}

export default App;
