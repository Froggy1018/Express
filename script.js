fetch('/message', {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message, nickname}),
})

.then(response => response.json())
.then(() => {
    loadMessages();
    messageInput.value = '';
})

.catch(error => {
    console.error('Error Submitting the message:', error);
});

function loadMessages(){
    fetch('/messages',
        { method: 'GET',
            headers: { 'Content-Type': 'application/json' }
         })
        }
        
