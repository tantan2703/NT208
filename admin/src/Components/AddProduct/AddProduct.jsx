import React, {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetail, setProductDetail] = useState({
        name: '',
        price: '',
        category: 'women',
        image: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changHandler = (e) => {
        setProductDetail({...productDetail, [e.target.name]: e.target.value});
    }

    const AddProduct = async () => {
        console.log(productDetail);
        let responseData;
        let product = productDetail;
        
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((response) => response.json()).then((data) => {responseData = data}).catch((err) => console.log(err));

        if (responseData.success) 
        {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(product)
            }).then((response) => response.json()).then((data) => {
                data.success?alert('Product added successfully'):alert('Product not added')
            }).catch((err) => console.log(err));
        }
    }
    
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetail.name} onChange={changHandler} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetail.price} onChange={changHandler} type="text" name='price' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetail.category} onChange={changHandler} name='category' className='addproduct-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-image' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{AddProduct()}} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct