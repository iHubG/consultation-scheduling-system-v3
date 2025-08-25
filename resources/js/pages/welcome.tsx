import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';
import DashboardPreview from '../../assets/images/dashboard.png'

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-4xl lg:flex-row">
                        {/* Left Content */}
                        <div className="flex flex-1 flex-col justify-between rounded-t-lg bg-white p-6 pb-8 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-tr-none lg:rounded-br-none lg:rounded-bl-lg lg:p-10 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div>
                                <div className="mb-2 flex items-center gap-3">
                                    <CalendarCheck size={30} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                                    <h1 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Consultation Scheduling System</h1>
                                </div>

                                <p className="mb-6 text-[14px] leading-[1.6] text-[#706f6c] dark:text-[#A1A09A]">
                                    A web-based platform designed to streamline the scheduling and management of academic consultations between
                                    students and faculty. Easily view availability, request time slots, and receive confirmations — all in one place.
                                </p>

                                <ul className="mb-6 flex flex-col space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-[#f53003] dark:bg-[#FF4433]"></span>
                                        <span>Book consultations with just a few clicks.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-[#f53003] dark:bg-[#FF4433]"></span>
                                        <span>Real-time availability of faculty schedules.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-[#f53003] dark:bg-[#FF4433]"></span>
                                        <span>Notifications and appointment tracking.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Auth Buttons */}
                            <div className="mt-6 flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Image / Graphic Area */}
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-b-lg bg-[#fff2f2] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg lg:rounded-bl-none dark:bg-[#1D0002]">
                            <div className="absolute inset-0 rounded-b-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg lg:rounded-bl-none dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                            <img 
                                src={DashboardPreview}
                                alt="Consultation Scheduling System" 
                                className="absolute inset-0 h-full w-full object-contain opacity-90" 
                            />                  
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
