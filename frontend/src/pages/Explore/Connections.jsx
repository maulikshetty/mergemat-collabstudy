import React from 'react'
import ConnectionsComponent from './ConnectionsComponent'

export default function Connections({ currentUser }) {
    return (
        <div>
            <ConnectionsComponent currentUser={currentUser} />

        </div>
    )
}
