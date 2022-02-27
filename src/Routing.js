import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import AdminDashBoard from './user/AdminDashBoard'
import UserDashBoard from './user/UserDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'


const Routing=()=> {
    return (
       <BrowserRouter>
            <Switch>
                <Route exact path="/"  component={Home}/>
                <Route exact path="/signup"  component={Signup}/>
                <Route exact path="/signin"  component={Signin}/>
                <Route exact path="/cart"  component={Cart}/>
                <AdminRoute exact path="/admin/dashboard"  component={AdminDashBoard} />
                <AdminRoute exact path="/admin/create/category"  component={AddCategory} />
                <AdminRoute exact path="/admin/categories"  component={ManageCategories} />
                <AdminRoute exact path="/admin/category/update/:id"  component={UpdateCategory} />
                <AdminRoute exact path="/admin/create/product"  component={AddProduct} />
                <AdminRoute exact path="/admin/product"  component={ManageProducts} />
                <AdminRoute exact path="/admin/product/update/:id"  component={UpdateProduct} />
                <PrivateRoute exact path="/user/dashboard"  component={UserDashBoard} />
                
            </Switch>    
       </BrowserRouter>
    )
}

export default Routing
