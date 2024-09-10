import { type ReactNode } from 'react';

type Props = Readonly<{
    children: ReactNode
}>

export default function CharacterLayout({ children }: Props) {
    return (
        <> {children} </>
    );
}