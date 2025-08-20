import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    current_page: number;
    last_page: number;
    links: PaginationLink[];
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number;
    to: number;
    total: number;
}

interface PaginationComponentProps {
    data: PaginatedData;
    preserveScroll?: boolean;
}

export default function PaginationComponent({ data, preserveScroll = true }: PaginationComponentProps) {
    const handlePageChange = (url: string | null) => {
        if (!url) return;

        router.get(
            url,
            {},
            {
                preserveScroll,
                preserveState: true,
            },
        );
    };

    if (data.last_page <= 1) {
        return null;
    }

    const basePath = data.links[0].url ? new URL(data.links[0].url).pathname : '';

    const renderPageNumbers = () => {
        const items = [];
        const currentPage = data.current_page;
        const lastPage = data.last_page;

        if (currentPage > 3) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => handlePageChange(`${basePath}?page=1`)} className="cursor-pointer">
                        1
                    </PaginationLink>
                </PaginationItem>,
            );

            if (currentPage > 4) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }
        }

        const start = Math.max(1, currentPage - 1);
        const end = Math.min(lastPage, currentPage + 1);

        for (let i = start; i <= end; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => handlePageChange(`${basePath}?page=${i}`)} isActive={i === currentPage} className="cursor-pointer">
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        if (currentPage < lastPage - 2) {
            if (currentPage < lastPage - 3) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            items.push(
                <PaginationItem key={lastPage}>
                    <PaginationLink onClick={() => handlePageChange(`${basePath}?page=${lastPage}`)} className="cursor-pointer">
                        {lastPage}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-sm text-muted-foreground">
                Showing {data.from} to {data.to} of {data.total} results
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(data.prev_page_url)}
                            className={`cursor-pointer ${
                                !data.prev_page_url ? 'pointer-events-none opacity-50' : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                        />
                    </PaginationItem>

                    {renderPageNumbers()}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(data.next_page_url)}
                            className={`cursor-pointer ${
                                !data.next_page_url ? 'pointer-events-none opacity-50' : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
