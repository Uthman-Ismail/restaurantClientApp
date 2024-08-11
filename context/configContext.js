import React, { createContext, useState, useEffect } from 'react';
import { db } from "../firestore.config";
import { doc, getDoc } from "firebase/firestore";

export const ConfigureContext = createContext({
    colorType: {
        backGroundLight: '',
        backGroundDark: '',
    },
    img: '',
    payment: 0,
    tId: '',
    addPayment: (pay) => {},
    addColor: (color) => {},
    addImage: (image) => {}
});

export const ConfigureContextProvider = ({ children }) => {
    const [amount, setAmount] = useState(0);
    const [tableId, setTableId] = useState("");
    const [colorType, setColorType] = useState({
        backGroundLight: '#A788EA',
        backGroundDark: '#5E4D84',
    });
    const [logo, setLogo] = useState('');

    const addColor = (color) => {
        setColorType(preVal => ({
            ...preVal,
            backGroundLight: color.backGroundLight,
            backGroundDark: color.backGroundDark,
        }));
    };
    
    const addImage = (image) => {
        setLogo(image);
    }

    const addPayment = (pay) => {
        setAmount(pay + amount);
    }

    useEffect(() => {
        const fetchData = async () => {
            const orderQuerySnapshot = await getDoc(doc(db, "order", tableId));
            if(orderQuerySnapshot.exists()){
                setAmount(orderQuerySnapshot.data().amount);
                setTableId(orderQuerySnapshot.data().tableId);
            }
        }
        fetchData();
    }, []);

    const value = {
        colorType: colorType,
        img: logo,
        payment: amount,
        tId: tableId,
        addColor: addColor,
        addImage: addImage,
        addPayment: addPayment
    };

    return (
        <ConfigureContext.Provider value={value}>
            {children}
        </ConfigureContext.Provider>
    );
};
