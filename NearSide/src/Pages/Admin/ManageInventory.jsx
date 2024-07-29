import React, {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import '/src/fonts.css';
import './ManageInventory.css';

function ManageInventory(){

    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [itemType, setItemType] = useState("");
    const [itemSeries, setItemSeries] = useState("");

    const onHandleBtnClick = (e) => {
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
                        <Form.Control placeholder="Item Name" onChange={(event) => setItemSeries(event.target.value)} className="manageInventoryFormInput" id="manage-form-input-itemseries" value={itemSeries}/>
                    </Col>
                </Form.Group>
            </Form>
            </>
        )
    }

    return(
        <>
            <h1 className="kaushan-script-regular pageBanner prevent-select">Manage Inventory</h1>
            <div id="manage-inventory-table-div">
                {renderForm()}
            </div>
        </>
    )
};

export default ManageInventory;