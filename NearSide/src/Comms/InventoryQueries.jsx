const stockInfo = {
    group_id: 3,
    group_name: "Philippines",
    stock_count: 5,
    item_price: 1200.50,
    currency: "PHP"
}


function getAllStockGroupInfo(){
    const allInfo = [stockInfo, stockInfo, stockInfo, stockInfo, stockInfo, stockInfo];
    return allInfo;
};

function getCurrencyList(){
    const allCurrencies = ["USD", "PHP"];
    return allCurrencies;
};

const InventoryQuery = {

    // Manage Inventory
    getAllStockGroupInfo,
    getCurrencyList
};

export default InventoryQuery;