const stockInfo = {
    group_id: 3,
    group_name: "Philippines",
    stock_count: 5,
    item_price: 1200.50,
    currency: "PHP"
}

const InventoryItem = {
    item_code: 1234567890,
    item_name: "Sample Item Name",
    item_description: "This is a sample item description",
    item_count: 50,
    item_price: 1200.00,
    item_currency: "PHP"
}


function getAllStockGroupInfo(){
    const allInfo = [stockInfo, stockInfo, stockInfo, stockInfo, stockInfo, stockInfo];
    return allInfo;
};

function getCurrencyList(){
    const allCurrencies = ["USD", "PHP"];
    return allCurrencies;
};

function getItemsWithCode(itemCode){
    const allItems = [InventoryItem, InventoryItem, InventoryItem, InventoryItem, InventoryItem, InventoryItem];
    return allItems;
}

const InventoryQuery = {

    // Manage Inventory
    getAllStockGroupInfo,
    getCurrencyList,

    // Check Inventory
    getItemsWithCode
};

export default InventoryQuery;