import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {RxAvatar} from 'react-icons/rx';

export default function FolderList({users}) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                users.map(user => (
                    <ListItem key={user.id}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{ 'bgcolor': 'deepOrange[500]' }}
                                alt={user.name}
                                src="/static/images/avatar/1.jpg"
                            >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary="Attending" />
                    </ListItem>
                ))
            }
        </List>
    );
}
