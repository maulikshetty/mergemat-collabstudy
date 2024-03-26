import React from 'react'
import uuid from 'react-uuid';

export default function getUniqueID() {
    let id = uuid();
    return id
}
