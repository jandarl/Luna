import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InventoryQuery from "../../Comms/InventoryQueries";
import '/src/fonts.css';
import './ItemSale.css';

function ItemSale(){

    const [inventoryItems, setInventoryItems] = useState(InventoryQuery.getItemsWithCode(""));

    const [searchedCode, setSearchedCode] = useState("");

    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [stockCount, setStockCount] = useState(0);
    const [itemPrice, setItemPrice] = useState(0.00);
    const [currency, setCurrency] = useState("");
    const [totalPrice, setTotalPrice] = useState(0.00);

    useEffect(() => {
        Promise.all([InventoryQuery.getItemsWithCode("")]).then(function(){
            setInventoryItems(InventoryQuery.getItemsWithCode(""));
            setCurrency(inventoryItems[0].item_currency);
        })
    },[]);

    const onHandleBtnClick = (e) => {

    }

    const onhandleTableClick = (e) => {

    }

    function renderForm(){
        return(
            <Form id="item-sale-form-id">
                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-search">Search:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Code" onChange={(event) => setSearchedCode(event.target.value)} className="itemSaleFormInput" value={searchedCode}/>
                    </Col>
                    <Col sm="12">
                        <Button variant="primary" size="lg" className="kreon-400 itemSaleButton" onClick={onHandleBtnClick}>Search</Button>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-itemcode">Item Code:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Code" onChange={(event) => setItemCode(event.target.value)} className="itemSaleFormInput" value={itemCode} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-itemname">Item Name:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Name" onChange={(event) => setItemName(event.target.value)} className="itemSaleFormInput" value={itemName} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Col sm="12">
                        <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-description">Item Description:</Form.Label>
                    </Col>
                    <Col sm="12">
                        <Form.Control as="textarea" placeholder="Description" onChange={(event) => setDescription(event.target.value)} rows={3} className="itemSaleFormInput" id="item-sale-input-description" value={description} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-itemprice">Item Price:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Price" onChange={(event) => setItemPrice(event.target.value)} className="itemSaleFormInput" value={itemPrice} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-itemstock">Item Stock:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Stock" onChange={(event) => setStockCount(event.target.value)} className="itemSaleFormInput" value={stockCount} readOnly/>
                    </Col>
                </Form.Group>

                 <Form.Group as={Row} className="itemSaleFormGroup">
                    <Button variant="primary" size="lg" className="kreon-400 itemSaleButton" onClick={onHandleBtnClick} id="clear-info-itemsale-button">Clear Information</Button>
                    <Col sm="12">
                        <Button variant="primary" size="lg" className="kreon-400 itemSaleButton" onClick={onHandleBtnClick}>Add to Cart</Button>
                    </Col>
                 </Form.Group>
            </Form>
        )
    }

    function renderItemCart(){
        return(
            <Table striped bordered hover id="item-sale-table">
                <thead>
                    <tr className="prevent-select" id="item-sale-table-header">
                        <th className="itemSaleTablehdrSm">Item Code</th>
                        <th className="itemSaleTablehdrMd">Name</th>
                        <th className="itemSaleTablehdrSm">Price/Piece</th>
                        <th className="itemSaleTablehdrSm">Count</th>
                        <th className="itemSaleTablehdrSm">Total Price</th>
                    </tr>
                </thead>
                {renderTableBody()}
            </Table>
        )
    }

    function renderTableBody(){
        return(
            <tbody id="item-sale-table-body">
                {inventoryItems.map((item, index) => 
                    <tr className="itemSaleTableItem prevent-select" key={item.group_name} id={"table-item-" + index} onClick={onhandleTableClick}>
                        <td>{item.item_code}</td>
                        <td>{item.item_name}</td>
                        <td>{item.item_currency} {item.item_price}</td>
                        <td>{item.item_count}</td>
                        <td>{item.item_currency} {item.item_price}</td>
                    </tr>
                )}
            </tbody>
        )
    }

    return(
        <>
        <div id="item-information-div">
            <h1 className="kaushan-script-regular pageBanner prevent-select">Item Information</h1>
            {renderForm()}
        </div>
        <div id="item-cart-div">
            <h1 className="kaushan-script-regular pageBanner prevent-select">Item Cart</h1>
            {renderItemCart()}
            <Button variant="primary" size="lg" id="remove-item-button" className="kreon-400 itemCartButton" onClick={onHandleBtnClick}>Remove</Button>
            <Button variant="primary" size="lg" id="clear-cart-button" className="kreon-400 itemCartButton" onClick={onHandleBtnClick}>Clear Cart</Button>
            <Button variant="primary" size="lg" id="checkout-button" className="kreon-400 itemCartButton" onClick={onHandleBtnClick}>Checkout</Button>
            <Form>
                <Form.Group as={Row} className="itemSaleFormGroup">
                    <Form.Label column sm="2" className="itemSaleFormLabel kreon-400" id="item-sale-label-totalprice">Total Price ({currency}):</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Price" className="itemSaleFormInput" id="item-sale-input-totalprice" value={totalPrice} readOnly/>
                    </Col>
                </Form.Group>
            </Form>
        </div>
        </>
    )
};

export default ItemSale;