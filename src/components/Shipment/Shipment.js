import './Shipment.css';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Container, Row } from 'react-bootstrap';
import Input from "@material-ui/core/Input";
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useHistory } from 'react-router-dom';


const Shipment = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { control, handleSubmit } = useForm();

    const history = useHistory();
    const onSubmit = (data) => {
        const orderedProduct = getDatabaseCart();
        const itemsOfOrderedProduct = Object.keys(orderedProduct);
        if (itemsOfOrderedProduct.length) {
            const order = { userName: loggedInUser.displayName, userEmail: loggedInUser.email, ship: { ...data }, order: { ...orderedProduct }, orderTime: new Date() };
            console.log(order);
            fetch('https://ema-john-server0.herokuapp.com/addOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        alert("Order successfully placed");
                        processOrder();
                    }
                })
        }
        else{
            alert("Please select product before making payment")
            history.push('/shop')
        }
    };
    return (
        <Container>
            <Row>
                <Col md lg="6">
                    <form onSubmit={handleSubmit(onSubmit)} className="shipment-form">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={loggedInUser.displayName}
                            render={({ field }) => <Input {...field} label="Name" placeholder="Name" />}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={loggedInUser.email}
                            render={({ field }) => <Input {...field} placeholder="Email" />}
                            rules={{ required: true }}
                            error="asldkfj;lasdkfj"
                        />
                        <Controller
                            placeholder="Address"
                            name="address"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Address" />}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="City" />}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="zip"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Zip" />}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Phone number" />}
                            rules={{ required: true }}
                        />
                        <Button className="btn" type="submit">Order Place</Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Shipment;