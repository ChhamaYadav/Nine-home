document.addEventListener("DOMContentLoaded",function(){
    const removeButtons=document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {
        button.addEventListener("click",function(){
            const productId=this.getAttribute("data-product-id");
            if(!productId){
            alert("Product not found.");
            return;
            }

//            Build request body
            const requestBody={
                productId:parseInt(productId),
                userId:12
            };

//            send DELETE request to backend

            fetch("http://localhost:8080/api/remove",{
            method :"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
            })
            .then(response =>{
                if(response.ok){
                alert("Item removed successfully.");
                this.closest(".cart-item").remove();
                }
                else{
                return response.text().then(text =>{
                throw new Error(text);
                });
                }
            })
            .catch(error => {
                console.error("Error removing item",error);
                alert("Failed to remove item.");
            });
        });
    });
});