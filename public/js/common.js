
let allLikeButton = document.querySelectorAll('.like-btn')


async function likeButton(productId) {
    // console.log('Ho gya');
    try {

        let response = await axios({
            method: 'post',
            url: `/products/${productId}/like`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }
    catch (e) {
        // res.redirect('/login')
        window.location.replace('/login')
        console.log(e.message, 'Error hai ye');
    }
}

for (let btn of allLikeButton) {
    btn.addEventListener('click', () => {
        let productId = btn.getAttribute('product-id')
        likeButton(productId)
    })
}