import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import UsrCtrlQuery from "../../Comms/UserControlQueries";
import InventoryQuery from "../../Comms/InventoryQueries";
import '/src/fonts.css';
import './ManageInventory.css';

function ManageInventory(){

    const [allGroups, setAllGroups] = useState(UsrCtrlQuery.getAllGroups());
    const [stockPerGroup, setstockPerGroup] = useState(InventoryQuery.getAllStockGroupInfo());
    const [currencyList, setCurrencyList] = useState(InventoryQuery.getCurrencyList());

    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [itemType, setItemType] = useState("");
    const [itemSeries, setItemSeries] = useState("");
    const [stockGroup, setStockGroup] = useState(1);
    const [stockCount, setStockCount] = useState(0);
    const [itemPrice, setItemPrice] = useState(0.00);
    const [currency, setCurrency] = useState(1);

    const [selectedStockTableID, setSelectedStockTableID] = useState("");
    const [stockGroupInfo, setStockGroupInfo] = useState({});

    useEffect(() => {
        Promise.all([UsrCtrlQuery.fetchAllGroups(), InventoryQuery.getAllStockGroupInfo(), InventoryQuery.getCurrencyList()]).then(function(){
            setAllGroups(UsrCtrlQuery.getAllGroups());
            setstockPerGroup(InventoryQuery.getAllStockGroupInfo());
            setCurrencyList(InventoryQuery.getCurrencyList());
        })
    },[]);

    const onHandleBtnClick = (e) => {
        if(e.currentTarget.id === "edit-group-button"){
            if(stockGroupInfo.group_name !== undefined){
                setStockGroup(stockGroupInfo.group_id);
                setStockCount(stockGroupInfo.stock_count);
                setItemPrice(stockGroupInfo.item_price);
                setCurrency(1);
            }
        }
    }

    const onhandleTableClick = (e) => {
        const id = "#" + e.currentTarget.id;

        if(selectedStockTableID !== ""){
            document.querySelector(selectedStockTableID).classList.remove('stockTableItemSelected');
        }

        if(id !== ""){
            document.querySelector(id).classList.add('stockTableItemSelected');
            setSelectedStockTableID(id);
        }

        setStockGroupInfo(stockPerGroup[e.currentTarget.rowIndex - 1]);
    }

    function renderForm(){
        return(
            <>
            <Form id="manage-inventory-form">
                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Col sm="12">
                        <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-searchitemcode">Search Item Code:</Form.Label>
                    </Col>             
                    <Col sm="12">
                        <Form.Control placeholder="Item Code" onChange={(event) => setItemCode(event.target.value)} className="manageInventoryFormInput" value={itemCode}/>
                    </Col>
                    <Col sm="12">
                        <Button variant="primary" size="lg" id="search-item-button" className="kreon-400 manageInventoryButton" onClick={onHandleBtnClick}>Search</Button>
                    </Col>
                    <Col sm="12">
                        <Button variant="primary" size="lg" id="delete-item-button" className="kreon-400 manageInventoryButton" onClick={onHandleBtnClick}>Delete Item</Button>
                    </Col>
                    <Col sm="12">
                        <Button variant="primary" size="lg" id="save-item-button" className="kreon-400 manageInventoryButton" onClick={onHandleBtnClick}>Save Item</Button>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Col sm="12">
                        <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-itemcode">Item Code:</Form.Label>
                    </Col>             
                    <Col sm="12">
                        <Form.Control placeholder="Item Code" onChange={(event) => setItemCode(event.target.value)} className="manageInventoryFormInput" value={itemCode}/>
                    </Col>
                    <Col sm="12">
                        <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-itemname">Item Name:</Form.Label>
                    </Col>             
                    <Col sm="12">
                        <Form.Control placeholder="Item Name" onChange={(event) => setItemName(event.target.value)} className="manageInventoryFormInput" id="manage-form-input-itemname" value={itemName}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Col sm="12">
                        <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-description">Description:</Form.Label>
                    </Col>
                    <Col sm="12">
                        <Form.Control as="textarea" placeholder="Description" onChange={(event) => setDescription(event.target.value)} rows={3} className="manageInventoryFormInput" id="manage-form-input-description" value={description}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Col sm="12">
                        <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-itemtype">Item Type:</Form.Label>
                    </Col>             
                    <Col sm="12">
                        <Form.Control placeholder="Item Type" onChange={(event) => setItemType(event.target.value)} className="manageInventoryFormInput" value={itemType}/>
                    </Col>
                    <Col sm="12">
                        <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-itemseries">Item Series:</Form.Label>
                    </Col>             
                    <Col sm="12">
                        <Form.Control placeholder="Item Series" onChange={(event) => setItemSeries(event.target.value)} className="manageInventoryFormInput" id="manage-form-input-itemseries" value={itemSeries}/>
                    </Col>
                </Form.Group>
            </Form>
            </>
        )
    }

    
    function renderStockTableBody(){
        if(stockPerGroup.length > 0){
            return(
                <tbody id="stock-table-body">
                    {stockPerGroup.map((item, index) => 
                        <tr className="stockTableItem prevent-select" key={item.group_name} id={"table-item-" + index} onClick={onhandleTableClick}>
                            <td>{item.group_name}</td>
                            <td>{item.stock_count}</td>
                            <td>{item.item_price}</td>
                            <td>{item.currency}</td>
                        </tr>
                    )}
                </tbody>
            )
        }
    }

    function renderStockTable(){
        return(
            <div id="stocktable-div">
            <Table striped bordered hover id="stock-table">
                <thead style={{ position: "sticky", top: "0" }}>
                    <tr className="prevent-select" id="stock-table-header">
                        <th className="stockTablehdrMd">Group</th>
                        <th className="stockTablehdrSm">Count</th>
                        <th className="stockTablehdrSm">Price</th>
                        <th className="stockTablehdrSm">Currency</th>
                    </tr>
                </thead>
                {renderStockTableBody()}
            </Table>
            </div>
        )
    }

    function renderStockInfo(){
        return(
            <>
            <h6 id="manage-inventory-stock-label" className="kreon-400">Stock Information:</h6>
            <div id="manage-inventory-stock-div">
            <Form>
                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-stockgroup">Stock Group:</Form.Label>
                    <Col sm="12">
                        <Form.Select className="manageInventoryFormInput" id="manage-form-input-stockgroup" onChange={(event) => setStockGroup(event.target.value)} value={stockGroup}>
                            {allGroups.map((item) => 
                              <option value={item.group_id}>{item.group_name}</option>
                            )}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-stockcount">Stock Count:</Form.Label>
                    <Col sm="12">
                        <Form.Control type="number" id="manage-form-input-stockcount" onChange={(event) => setStockCount(event.target.value)} value={stockCount}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-itemprice">Item Price:</Form.Label>
                    <Col sm="12">
                        <Form.Control type="number" id="manage-form-input-itemprice" onChange={(event) => setItemPrice(event.target.value)} value={itemPrice}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Form.Label column sm="2" className="manageInventoryFormLabel kreon-400" id="manage-form-label-currency">Currency:</Form.Label>
                    <Col sm="12">
                        <Form.Select className="manageInventoryFormInput" id="manage-form-input-currency" onChange={(event) => setCurrency(event.target.value)} value={currency}>
                            {currencyList.map((item, index) => 
                              <option value={index}>{item}</option>
                            )}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="manageInventoryFormGroup">
                    <Button variant="primary" size="lg" id="save-group-button" className="kreon-400 manageInventoryButton" onClick={onHandleBtnClick}>Save</Button>
                </Form.Group>
            </Form>
            {renderStockTable()}
            <Button variant="primary" size="lg" id="edit-group-button" className="kreon-400 manageInventoryButton" onClick={onHandleBtnClick}>Edit</Button>
            </div>
            </>
        )
    }

    return(
        <>
            <h1 className="kaushan-script-regular pageBanner prevent-select">Manage Inventory</h1>
            <div id="manage-inventory-table-div">
                {renderForm()}
                {renderStockInfo()}
            </div>
        </>
    )
};

export default ManageInventory;