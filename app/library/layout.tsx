import { type ReactNode } from 'react';

type Props = Readonly<{
    children: ReactNode
}>

export default function Layout({ children }: Props) {
    return (
        <>
            <header>
                Character Library
            </header>
            <main>
                {children}
            </main>
        </>
    );
}