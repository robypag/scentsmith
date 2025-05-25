import { Badge } from "@/components/ui/badge";

export const getDocumentTypeBadge = (type: string) => {
    switch (type) {
        case "legal":
            return (
                <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200">
                    Legal
                </Badge>
            );
        case "sds":
            return (
                <Badge className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800">
                    SDS
                </Badge>
            );
        case "formula":
            return <Badge className="bg-gold text-gold-foreground hover:bg-gold/80">Formula</Badge>;
        case "research":
            return (
                <Badge className="bg-pink-200 text-pink-800 hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200">
                    Research
                </Badge>
            );
        default:
            return <Badge variant="secondary">{type}</Badge>;
    }
};
