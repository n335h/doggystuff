    import React from 'react';
    import { ReactNode } from 'react';
    import './Survey.css'


    type FormWrapperProps = {
        title: string;
        children: ReactNode;
    }

    export function FormWrapper({ title, children} : FormWrapperProps) {
        return (
            <div className="formWrapper">
                <h1 className="formTitle">{title}</h1>
                <div className="formContent">
                    {children}
                </div>
            </div>
        )
    }