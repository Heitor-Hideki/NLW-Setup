interface IProgressBar {
    progress: number
}

export function ProgressBar({
    progress
}: IProgressBar) {
    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div 
                className='h-3 rounded-xl bg-violet-600'
                role='progressbar'
                aria-label='Progresso de hábitos completados nesse dia'
                aria-valuenow={progress} 
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}