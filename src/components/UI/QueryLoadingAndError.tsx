import React from "react";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const LoadingComponent = () => {
  return (
    <div className="pt-16">
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
      </div>
    </div>
  );
};

export const ErrorComponent = (error: any) => {
  return <h1 className="font-semibold">{error.message}</h1>;
};
