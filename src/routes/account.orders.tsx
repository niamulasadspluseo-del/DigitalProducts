import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/account/orders")({ component: Orders });

function Orders() {
  const userId = useStore((s) => s.sessionUserId)!;
  const orders = useStore((s) => s.orders.filter((o) => o.userId === userId));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="flex flex-col gap-6">
        {orders.map((o) => (
          <Link key={o.id} to="/account/orders/$id" params={{ id: o.id }} className="block">
            <Card className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md border">
              <div>
                <div className="font-medium">{o.items.map((i) => i.title).join(", ")}</div>
                <div className="text-xs text-muted-foreground mt-1.5">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4"><Badge variant="outline" className="px-3 py-1">{o.status}</Badge><span className="font-semibold text-lg">${o.total.toFixed(2)}</span></div>
            </Card>
          </Link>
        ))}
        {!orders.length && <Card className="p-6 text-center text-sm text-muted-foreground">No orders yet.</Card>}
      </div>
    </div>
  );
}
