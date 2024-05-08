
        // fetch('https://autoapi.cardzpay.com/client/template/api/templates')
        import React, { useEffect, useState } from 'react';
        import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
        
        const UpdateTemplate = () => {
            const [templates, setTemplates] = useState([]);
            const [open, setOpen] = useState(false);
            const [currentTemplate, setCurrentTemplate] = useState({ id: '', templateName: '', text: '' });
        
            useEffect(() => {
                fetch('https://autoapi.cardzpay.com/client/template/api/templates')
                    .then((response) => response.json())
                    .then((data) => {
                        if (Array.isArray(data)) {
                            setTemplates(data);
                        } else {
                            console.error('Data is not an array:', data);
                        }
                    })
                    .catch((error) => console.error('Error:', error));
            }, []);
        
            const handleClickOpen = (template) => {
                setCurrentTemplate(template);
                setOpen(true);
            };
        
            const handleClose = () => {
                setOpen(false);
            };
        
            const handleSave = () => {
                fetch(`https://autoapi.cardzpay.com/client/template/api/template/${currentTemplate._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ templateName: currentTemplate.templateName, text: currentTemplate.text }),
                })
                .then((response) => response.json())
                .then((data) => {
                    const updatedTemplates = templates.map((template) => template._id === data._id ? data : template);
                    setTemplates(updatedTemplates);
                    setOpen(false);
                })
                .catch((error) => console.error('Error:', error));
            };
        
            const handleChange = (e) => {
                setCurrentTemplate({ ...currentTemplate, [e.target.name]: e.target.value });
            };
            const handleDelete = (id) => {
                // Logic to handle delete
                console.log('Delete', id);
            };
            return (
                <TableContainer component={Paper} style={{margin: '110px 20px 20px 20px', }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Template Name</TableCell>
                                <TableCell>Text</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {templates.map((template) => (
                                <TableRow key={template._id}>
                                    <TableCell>{template.templateName}</TableCell>
                                    <TableCell dangerouslySetInnerHTML={{ __html: template.text }} />
                                    <TableCell>
                                        <Button color="primary" onClick={() => handleClickOpen(template)}>Update</Button>
                                        <Button onClick={() => handleDelete(template._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Update Template</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="templateName"
                                label="Template Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={currentTemplate.templateName}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="text"
                                label="Text"
                                type="text"
                                fullWidth
                                variant="standard"
                                multiline
                                rows={4}
                                value={currentTemplate.text}
                                onChange={handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </TableContainer>
            );
        };
        
        export default UpdateTemplate;
        