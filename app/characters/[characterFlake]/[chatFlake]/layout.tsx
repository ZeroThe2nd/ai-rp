import { type ReactNode } from 'react';
import { AI } from '@action/ai';

type Props = Readonly<{
    children: ReactNode
}>

export default function CharacterChatLayout({ children }: Props) {
    return (
        <AI>{ children }</AI>
    );
}