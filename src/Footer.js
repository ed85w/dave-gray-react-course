const Footer = ( {items, newItem} ) => {
    const today = new Date();

    return (
        <footer>
            <p>Copyright &copy; {today.getFullYear()}</p>
            <p>{ items.length } list { items.length === 1 ? " item" : " items"} </p>
            <p>{newItem}</p>
        </footer>
    )
}

export default Footer
