import React from 'react';

function SearchBox({ allUsers }) {
  return (
    <>
      {allUsers.map(user => 
        <div key={user.id}>
          <h3>{user.email}</h3>
        </div>
      )}
    </>
  )
}

export default SearchBox;