const app = express();

app.post('/messages', async (req, res) => {
    let{message , nickname} = req.body;

    if (!message || typeof message !== 'string'){
        return res.status(400).json({ error: 'Invalid message' });
    }

    if (!nickname || typeof nickname !== 'string' || nickname.trim() === ''){
        nickname = 'Anonymous';
    }

    try {
        const data= await loadMessages();
        const messages = data.messages || [];

        if(messages.length >=5){
            messages.shift();
        }

        messages.push({nickname, message});

        await saveMessages(messages);
        res.json({messages});
    } catch (err) {
        console.error('Error adding message:', err);
        res.status(500).json({ error: 'Error adding message' });
    }
});

app.get('/messages', async (req, res) => {
    try{
        const data = await loadMessages();
        res.json(data);
    } catch (err){
        console.error('Error loading messages:', err);
        res.status(500).json({ error: 'Error loading messages' });
    }
});