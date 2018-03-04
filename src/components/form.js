import React from 'react'

export default ({onChangeHandler}) =>
  <form>
    <div className="form-group">
      <input type="text" 
        className="form-control form-control-lg" 
        name="search" 
        placeholder="Search" 
        onChange={onChangeHandler} />
    </div>
  </form>