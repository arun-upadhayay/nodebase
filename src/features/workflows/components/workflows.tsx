"use client";

import { formatDistanceToNow } from "date-fns";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { toast } from "sonner";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "../hooks/use-entity-search";
import type { Workflow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";
export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();

  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      palceholder="Search workflows"
    />
  );
};

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <EntityList
      items={workflows.data.items}
      getkey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, model } = useUpgradeModel();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {model}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLable="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkFlowPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();
  return (
    <EntityPagination
      disabled={workflows.isFetching}
      page={workflows.data?.page || 1}
      totalPages={workflows.data?.totalPages}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};
export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkFlowPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};
export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows..." />;
};

export const WorkflowsEmpty = () => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, model } = useUpgradeModel();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {model}
      <EmptyView
        message="You haven't created any workflows yet. Get started by creating a new workflow."
        onNew={handleCreate}
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {

  const  removeWorkflow = useRemoveWorkflow()
  const handleRemove = () => {
    removeWorkflow.mutate({
      id: data.id
    })
    
  }

  return (
    <EntityItem
      title={data.name}
      href={`/workflows/${data.id}`}
      subtitle={<>Updated {" "}
      {formatDistanceToNow(data.updatedAt, {
        addSuffix: true,
      })} {" "}
       &bull; Created {""}
       {formatDistanceToNow(data.createdAt,{
         addSuffix: true
       })}
       
       </>}
      image={
        <div className="size-8 items-center justify-center">
          <WorkflowIcon className="size-s text-muted-foreground" />
        </div>
      }

      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
