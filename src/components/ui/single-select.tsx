import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { X, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { forwardRef, useEffect } from "react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  [key: string]: string | boolean | undefined;
}

interface GroupOption {
  [key: string]: Option[];
}

interface SingleSelectorProps {
  value?: Option;
  defaultOptions?: Option[];
  options?: Option[];
  placeholder?: string;
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  delay?: number;
  triggerSearchOnFocus?: boolean;
  onSearch?: (value: string) => Promise<Option[]>;
  onSearchSync?: (value: string) => Option[];
  onChange?: (option: Option) => void;
  disabled?: boolean;
  groupBy?: string;
  className?: string;
  selectFirstItem?: boolean;
  creatable?: boolean;
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
}

export interface SingleSelectorRef {
  selectedValue: Option | undefined;
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      "": options,
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn("py-6 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = "CommandEmpty";

const SingleSelector = React.forwardRef<SingleSelectorRef, SingleSelectorProps>(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      disabled,
      groupBy,
      className,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
    }: SingleSelectorProps,
    ref: React.Ref<SingleSelectorRef>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const [selected, setSelected] = React.useState<Option | undefined>(value);
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(defaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = React.useState("");
    const [commandValue, setCommandValue] = React.useState("");
    const [showAllOptions, setShowAllOptions] = React.useState(true);
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: selected,
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected(undefined),
      }),
      [selected]
    );

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        inputRef.current.blur();
      }
    };

    const handleUnselect = React.useCallback(() => {
      // Clear selected value
      setSelected(undefined);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange?.(undefined as any);

      // Clear input to ensure no filtering is applied
      setInputValue("");

      // Refresh options to show all options
      if (arrayOptions) {
        setOptions(transToGroupOption(arrayOptions, groupBy));
      }
    }, [arrayOptions, groupBy, onChange]);

    useEffect(() => {
      // When dropdown opens, ensure all options are shown
      if (open && arrayOptions && !inputValue) {
        const fullOptions = transToGroupOption([...arrayOptions], groupBy);
        setOptions(fullOptions);
      }
    }, [open, arrayOptions, groupBy, inputValue]);


    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchend", handleClickOutside);
      };
    }, [open]);

    useEffect(() => {
      if (value !== undefined) {
        setSelected(value);
      }
    }, [value]);

    useEffect(() => {
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [defaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      };

      const exec = async () => {
        if (!onSearchSync || !open) return;

        if (triggerSearchOnFocus) {
          doSearchSync();
        }

        if (debouncedSearchTerm) {
          doSearchSync();
        }
      };

      void exec();
    }, [
      debouncedSearchTerm,
      groupBy,
      onSearchSync,
      open,
      triggerSearchOnFocus,
    ]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      void exec();
    }, [debouncedSearchTerm, groupBy, onSearch, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return undefined;

      // Check if option already exists
      let exists = false;
      Object.values(options).forEach((optGroup) => {
        if (
          optGroup.some(
            (opt) => opt.value === inputValue || opt.label === inputValue
          )
        ) {
          exists = true;
        }
      });

      if (
        exists ||
        (selected &&
          (selected.value === inputValue || selected.label === inputValue))
      ) {
        return undefined;
      }

      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            // Create the new option
            const newOption = { value, label: value };

            // Update selected state and trigger onChange
            setSelected(newOption);
            onChange?.(newOption);

            // Clear input
            setInputValue("");

            // Close dropdown
            setOpen(false);
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      );

      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item;
      }

      return undefined;
    };

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator) return undefined;

      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }

      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      return undefined;
    }, [creatable, commandProps?.filter]);

    return (
      <Command
        ref={dropdownRef}
        {...commandProps}
        value={commandValue}
        className={cn(
          "h-auto overflow-visible bg-transparent",
          commandProps?.className
        )}
        shouldFilter={false}
        filter={commandFilter()}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
          onClick={() => {
            if (disabled) return;

            // Always open the dropdown and show all options
            setOpen(true);

            // Clear input value when opening to ensure filtering doesn't restrict options
            
            // Force showing all options
            setShowAllOptions(true);
            
            setInputValue("");


            // Reset cmdk's internal search state
            setCommandValue(Math.random().toString());

            // Always refresh options when opening
            if (arrayOptions) {
              setOptions(transToGroupOption(arrayOptions, groupBy));
            }

            // Focus the input
            inputRef?.current?.focus();

            // If search functions are provided, trigger them
            if (triggerSearchOnFocus) {
              if (onSearch) {
                onSearch("");
              } else if (onSearchSync) {
                const res = onSearchSync("");
                setOptions(transToGroupOption(res || [], groupBy));
              }
            }
          }}
        >
          {selected ? (
            <div className="flex flex-1 items-center">
              {selected.label}
              {!disabled && (
                <button
                  type="button"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect();
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value);
                setShowAllOptions(value.length === 0);
                inputProps?.onValueChange?.(value);
              }}
              onBlur={(event) => {
                if (!onScrollbar) {
                  setOpen(false);
                }
                inputProps?.onBlur?.(event);
              }}
              onFocus={(event) => {
                setOpen(true);

                // Always refresh options when opening
                if (arrayOptions) {
                  setOptions(transToGroupOption(arrayOptions, groupBy));
                }

                // Also trigger search if configured
                if (triggerSearchOnFocus) {
                  if (onSearch) {
                    onSearch("");
                  } else if (onSearchSync) {
                    const res = onSearchSync("");
                    setOptions(transToGroupOption(res || [], groupBy));
                  }
                }

                inputProps?.onFocus?.(event);
              }}
              placeholder={placeholder}
              className={cn(
                "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
                inputProps?.className
              )}
            />
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>
        <div className="relative">
          {open && (
            <CommandList
              className="absolute top-1 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
              onMouseLeave={() => {
                setOnScrollbar(false);
              }}
              onMouseEnter={() => {
                setOnScrollbar(true);
              }}
              onMouseUp={() => {
                inputRef?.current?.focus();
              }}
            >
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {EmptyItem()}
                  {CreatableItem()}
                  {!selectFirstItem && (
                    <CommandItem value="-" className="hidden" />
                  )}
                  {Object.entries(options).map(([key, dropdowns]) => (
                    <CommandGroup
                      key={key}
                      heading={key}
                      className="h-full overflow-auto"
                    >
                      <>
                        {dropdowns
                          .filter(
                            (option) =>
                              showAllOptions ||
                              option.label
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                          )
                          .map((option) => {
                            return (
                              <CommandItem
                                key={option.value}
                                value={option.label}
                                disabled={option.disable}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                // Clear input to ensure no filtering is applied next time
                                setInputValue("");

                                // Set selected option
                                setSelected(option);
                                onChange?.(option);

                                // Close dropdown
                                setOpen(false);
                              }}
                              className={cn(
                                "cursor-pointer",
                                option.disable &&
                                  "cursor-default text-muted-foreground"
                              )}
                            >
                              {option.label}
                            </CommandItem>
                          );
                        })}
                      </>
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </Command>
    );
  }
);

SingleSelector.displayName = "SingleSelector";
export { SingleSelector };
