import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InventoryQuery from "../../Comms/InventoryQueries";
import '/src/fonts.css';
import './CheckInventory.css';

function CheckInventory(){
    const [searchedCode, setSearchedCode] = useState("");
    const [inventoryItems, setInventoryItems] = useState(InventoryQuery.getItemsWithCode(""));

    useEffect(() => {
        Promise.all([InventoryQuery.getItemsWithCode("")]).then(function(){
            setInventoryItems(InventoryQuery.getItemsWithCode(""));
        })
    },[]);

    function onHandleBtnClick(){
        
    }

    function onhandleTableClick(){

    }

    function renderSearch(){
        return(
            <Form>
                <Form.Group as={Row} className="checkInventoryFormGroup">
                    <Form.Label column sm="2" className="checkInventoryFormLabel kreon-400" id="check-inventory-label-search">Search:</Form.Label>
                    <Col sm="12">
                        <Form.Control placeholder="Item Code" onChange={(event) => setSearchedCode(event.target.value)} className="checkInventoryFormInput" value={searchedCode}/>
                    </Col>
                    <Col sm="12">
                        <Button variant="primary" size="lg" className="kreon-400 checkInventoryButton" onClick={onHandleBtnClick}>Search</Button>
                    </Col>
                </Form.Group>
            </Form>
        )
    }

    function renderTableBody(){
        return(
            <tbody id="inventory-table-body">
                {inventoryItems.map((item, index) => 
                    <tr className="inventoryTableItem prevent-select" key={item.group_name} id={"table-item-" + index} onClick={onhandleTableClick}>
                        <td>{item.item_code}</td>
                        <td>{item.item_name}</td>
                        <td>{item.item_description}</td>
                        <td>{item.item_count}</td>
                        <td>{item.item_currency} {item.item_price}</td>
                    </tr>
                )}
            </tbody>
        )
    }

    function renderInventory(){
        return(
            <Table striped bordered hover id="inventory-table">
                <thead>
                    <tr className="prevent-select" id="inventory-table-header">
                        <th className="inventoryTablehdrSm">Item Code</th>
                        <th className="inventoryTablehdrMd">Name</th>
                        <th className="inventoryTablehdrLg">Description</th>
                        <th className="inventoryTablehdrSm">Stock</th>
                        <th className="inventoryTablehdrSm">Price</th>
                    </tr>
                </thead>
                {renderTableBody()}
            </Table>
        )
    }

    return(
        <>
        <h1 className="kaushan-script-regular pageBanner prevent-select">Check Inventory</h1>
        <div id="check-inventory-div">
            {renderSearch()}
            {renderInventory()}
        </div>
        </>
    )
};

export default CheckInventory;