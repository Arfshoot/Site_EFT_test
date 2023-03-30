import React from 'react'


// js et scss
import './../../styles/Admin.scss'

export default function Admin() {
  return (
    <div className="admin-container">
        <h1 className="admin-title">Administration</h1>
        <div>
        <a href="/List-Users" className="List-users">Liste des membres</a>
        </div>
    </div>
  )
}
