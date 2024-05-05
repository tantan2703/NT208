import React, {useState} from 'react'
import './AdminAddProduct.css'
import upload_area from '../Assets/upload_area.svg'
import AdminSidebar from '../AdminSidebar/AdminSidebar'


const AdminAddProduct = () => {

    // Tạo một list brand
    const brandList = ['Audemars Piguet', 'Cartier', 'Tudor', 'Breitling', 'Oris',
    'Richard Mille', 'Hublot', 'IWC', 'Jaeger-LeCoultre', 'Longines',
    'Omega', 'Panerai', 'Patek Philippe', 'Seiko', 'Sinn', 'Edox',
    'NOMOS', 'Hamilton', 'Meistersinger', 'Rado', 'TAG Heuer', 'Ebel',
    'A. Lange & Söhne', 'Vacheron Constantin', 'Zenith'];

    const sexList = ["Men's watch/Unisex", "Women's watch"];

    const [image, setImage] = useState(false);
    const [productDetail, setProductDetail] = useState({
        name: '',
        price: 0,
        image: '',
        brand: '',
        model: '',
        size: '',
        year: '',
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

        await fetch('/upload', {
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
            await fetch('/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(product)
            }).then((response) => response.json()).then((data) => {
                data.success?alert('Product added successfully'):alert('Product not added')
            }).catch((err) => console.log(err));

            // retrain model
            await fetch('/retrain', {
                method: 'GET',
            }).then((response) => response.json()).then((data) => {
                console.log(data);
            }).catch((err) => console.log(err));
        }
    }
    
  return (
    <div className='admin'>
      <AdminSidebar/>
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Watch name</p>
            <input value={productDetail.name} onChange={changHandler} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetail.price} onChange={changHandler} type="text" name='price' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Product size</p>
            <input value={productDetail.size} onChange={changHandler} type="text" name='size' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Year</p>
            <input value={productDetail.year} onChange={changHandler} type="text" name='year' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Watch model</p>
            <input value={productDetail.model} onChange={changHandler} type="text" name='model' placeholder='Type here'/>
        </div>
        <div className="addproduct-itemfield">
            <p>Watch Brand</p>
            <select value={productDetail.brand} onChange={changHandler} name='brand' className='addproduct-selector'>
                {
                    brandList.map((brand, index) => {
                        return <option key={index} value={brand}>{brand}</option>
                    })
                }
            </select>
        </div>
        <div className="addproduct-itemfield">
            <p>Watch Sex</p>
            <select value={productDetail.sex} onChange={changHandler} name='sex' className='addproduct-selector'>
                {
                    sexList.map((brand, index) => {
                        return <option key={index} value={brand}>{brand}</option>
                    })
                }
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
    </div>
  )
}

export default AdminAddProduct