import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import {resources} from "../constants.js";

const ResourceButtons = () => {
    const [selectedAppButton, setSelectedAppButton] = useState(1);
    return (
        <div style={{display: 'flex', gap: '8px', marginBottom: '32px'}}>
                {resources.map(r => (
                    <Button
                        key={r.id}
                        type={selectedAppButton === r.id ? "primary" : undefined}
                        onClick={() => setSelectedAppButton(r.id)}>
                        {r.name}
                    </Button>
                ))}
        </div>
    )
};

export default ResourceButtons;
