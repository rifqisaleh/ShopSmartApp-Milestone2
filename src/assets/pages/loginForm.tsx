import React, {useState} from "react";

const Input = () => {
    const [formData, setFormData] = useState ({
        email: 'asdfk@revou.com',
        password: '12345678',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    const handleSubmit = (event: React.FormEvent) =>{
        event.preventDefault();
        alert(
            'Henlo, Muach'
        );
    };

  return (
    <div>
        <h1> Sign In</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            onChange={handleChange}
            value={formData.email}
            />
             <input
            type="password"
            onChange={handleChange}
            value={formData.email}
            />
            <input type="submit"/>
        </form>
    </div>
  );  
};

export default Input