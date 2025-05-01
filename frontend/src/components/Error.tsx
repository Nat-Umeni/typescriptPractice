import { ErrorProps } from '../types/types';

export default function Error({ message }: ErrorProps) {
    return (
        <div>
            <p className="text-red-500 text-center">{ message }</p>
        </div>
    );
}
